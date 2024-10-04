  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { initializeApp } from 'firebase/app';
  import { getAuth, deleteUser, User } from 'firebase/auth';
  import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    sendPasswordResetEmail 
  } from 'firebase/auth';
  import { AngularFirestore } from '@angular/fire/compat/firestore';
  import { environment } from '../environments/environment';
  import { HttpClient } from '@angular/common/http';
  import { Observable, forkJoin, of } from 'rxjs';
  import { Usuario } from '../models/Usuario';
  import { map } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthenticateService {
    private app = initializeApp(environment.firebase);
    private auth = getAuth(this.app);

    constructor(
      private router: Router, 
      public firestore: AngularFirestore, 
      private http: HttpClient,
      
    ) {}

    /**
     * Registro de un nuevo usuario en Firebase Authentication y Firestore
     * @param email
     * @param password
     */
    register(email: string, password: string,nombre:string,perfil:string,legajo:string,estado:boolean): Promise<void> {
      return createUserWithEmailAndPassword(this.auth, email, password)
        .then((result) => {
          sendEmailVerification(result.user);
    
          // Datos del usuario a enviar al backend (Firestore)
          const usuarioData: Usuario = {
            legajo:legajo,
            estado: estado,              // Estado predeterminado
            id: result.user.uid,               // Asegúrate de incluir el 'id'
            uid: result.user.uid,              // También el 'uid' desde Firebase
            nombre: nombre, // Nombre (puedes solicitarlo en otro momento)
            email: result.user.email || '',    // Email verificado por Firebase
            usuario: email.split('@')[0],      // Generar nombre de usuario
            perfil: perfil,                 // Perfil predeterminado
            password: password                 // Solo si es necesario almacenarlo (normalmente no es seguro)
          };
    
          // Guardar los datos del usuario en Firestore
          return this.createUsuario(usuarioData);
        })
        .catch((error) => {
          console.error('Error en el registro: ', error);
          throw error;
        });
    }
   // authenticate.service.ts



    /**
     * Guardar usuario en Firestore
     * @param usuarioData
     */
    createUsuario(usuarioData: Usuario): Promise<void> {
      return this.firestore.collection('usuarios').doc(usuarioData.uid).set(usuarioData);
    }

    /**
     * Eliminar usuario de Firestore y Firebase Auth
     * @param uid
     * Iniciar sesión
     * @param email
     * @param password
     */
    login(email: string, password: string): Promise<void> {
      return signInWithEmailAndPassword(this.auth, email, password)
        .then((result) => {
          if (!result.user.emailVerified) {
            sendEmailVerification(result.user);
            this.logout();
            throw new Error('auth/email-not-verified');
          }
    
          // Actualiza el estado a true en Firestore después de iniciar sesión
          return this.updateUserStatus(result.user.uid, true);
        })
        .catch((error) => {
          console.error('Error en el inicio de sesión: ', error);
          throw error;
        });
    }
    //este sirve para actualizar la variable estado cuando se loguee
    updateUserStatus(uid: string, estado: boolean): Promise<void> {
      return this.firestore.collection('usuarios').doc(uid).update({ estado: estado })
        .then(() => {
          console.log('Estado actualizado a', estado);
        })
        .catch((error) => {
          console.error('Error al actualizar el estado del usuario:', error);
          throw error;
        });
    }
    
    /**
     * Cerrar sesión
     */
    logout() {
      this.auth.signOut();
    }

    /**
     * Restablecer contraseña
     * @param email
     */
    forgotPassword(email: string): Promise<void> {
      return sendPasswordResetEmail(this.auth, email)
        .catch((error) => {
          console.error('Error en el restablecimiento de contraseña: ', error);
          throw error;
        });
    }

    /**
     * Obtener UID del usuario autenticado
     */
    getCurrentUserUID(): string | null {
      return this.auth.currentUser ? this.auth.currentUser.uid : null;
    }

    /**
     * Verificar autenticación del usuario
     */
    isAuthenticated(): boolean {
      return this.auth.currentUser !== null;
    }
    getCurrentUser(): Promise<User | null> {
      return new Promise((resolve, reject) => {
        const unsubscribe = this.auth.onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user);
        }, reject);
      });
    }
    /**
     * Obtener usuario por ID desde Firestore
     * @param id
     */
    getUsuario(id: string): Observable<Usuario | null> {
      return this.firestore.collection<Usuario>('usuarios').doc(id).valueChanges().pipe(
        map(user => user || null)
      );
    }

    /**
     * Obtener lista de usuarios autenticados y combinarlos con usuarios de Firestore
     */
    getUsuariosCombinados(): Observable<any[]> {
      const firestoreUsuarios$ = this.firestore.collection<Usuario>('usuarios').valueChanges();
      const authUsuarios$ = this.getUsuariosAutenticados();
    
      return forkJoin([firestoreUsuarios$, authUsuarios$]).pipe(
        map(([firestoreUsuarios, authUsuarios]) => {
          return authUsuarios.map(authUser => {
            const firestoreUser = firestoreUsuarios.find(firestoreUser => firestoreUser.uid === authUser.uid);
            
            return {
              uid: authUser.uid,
              email: authUser.email,
              nombre: firestoreUser ? firestoreUser.nombre : 'Nombre no encontrado'
            };
          });
        })
      );
    }
    
    eliminarUsuario(uid: string): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/api/users/${uid}`);
    }
    
    /**
     * Obtener lista de usuarios autenticados desde backend
     */
    getUsuariosAutenticados(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:3000/api/users'); // URL del backend
    }
  } 
