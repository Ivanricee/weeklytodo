import { FirebaseError, initializeApp } from 'firebase/app'
import {
  DatabaseReference,
  endAt,
  getDatabase,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
  startAt,
} from 'firebase/database'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { getTaskByWeek, getWeekRange, initialWeekDays, TaskByWeek } from './utils'

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: 'https://sifo-app-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // The value of `storageBucket` depends on when you provisioned your default bucket (learn more)
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)
let userId = auth.currentUser?.uid
let taskRef: DatabaseReference | null = null
//---
type AuthFbResp = { user?: string; error?: string }
type AuthFbProps = { email: string; password: string }
export const AuthFirebase = async ({ email, password }: AuthFbProps): Promise<AuthFbResp> => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    const userFb = response.user

    if (userFb && userFb.email) return { user: userFb.email }
    return { error: 'algo salió mal' }
  } catch (error) {
    const fbError = error as FirebaseError
    console.error('Código de error:', fbError.code)
    console.error('Mensaje de error:', fbError.message)
    return { error: 'Revisa tus credenciales' }
  }
}
type RegisFbResp = { user?: string; error?: string }
type RegisFbProps = { email: string; password: string }
export const RegisterFirebase = async ({ email, password }: RegisFbProps): Promise<RegisFbResp> => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    const userFb = response.user

    if (userFb && userFb.email) return { user: userFb.email }
    return { error: 'algo salió mal' }
  } catch (error) {
    const fbError = error as FirebaseError
    console.error('Código de error:', fbError.code)
    console.error('Mensaje de error:', fbError.message)
    return { error: 'Revisa tus credenciales' }
  }
}

type LogoutResp = { error?: string } | undefined
export const LogoutFirebase = async (): Promise<LogoutResp> => {
  try {
    await signOut(auth)
  } catch (error) {
    const fbError = error as FirebaseError
    console.error('Código de error:', fbError.code)
    console.error('Mensaje de error:', fbError.message)
    return { error: 'Revisa tus credenciales' }
  }
}

type stateProps = (user: User | null) => void
export const authStateChange = (callback: stateProps) => {
  return onAuthStateChanged(auth, (user) => {
    if (!user) return callback(null)
    return callback(user)
  })
}

// DATABASE

export type Task = {
  taskId: string
  title: string
  date: number
  day: number
  completed: boolean
  isLoading?: boolean
}
type CallbackType = (taskByWeek: TaskByWeek) => void
export const readTaskFB = (callback: CallbackType) => {
  userId = auth.currentUser?.uid

  //dayyyy
  const { weekStart, weekEnd } = getWeekRange()
  //dayyyy
  const taskRef = ref(db, `users/${userId}/tasks`)
  const taskQuery = query(taskRef, orderByChild('date'), startAt(weekStart), endAt(weekEnd))
  onValue(taskQuery, (snapshot) => {
    if (!snapshot.exists()) {
      console.log('not task found within the date range')
      return callback(initialWeekDays)
    }
    const tasksFB = snapshot.val()
    const taskByWeek = getTaskByWeek(tasksFB)
    console.log({ taskByWeek })

    //setTimeout(() => callback(tasks), 5000)
    callback(taskByWeek)
  })
}
export const generateTaskId = () => {
  const userId = auth.currentUser?.uid
  if (!userId) console.log({ error: 'No estás conectado' })

  taskRef = push(ref(db, `users/${userId}/tasks`))
  const taskId = taskRef.key
  //console.log('id created from reference ', { taskId, taskRef })

  return taskId
}
type writeTaskRespo = {
  success: boolean
  error?: string | null
}
export const writeTaskFB = async ({
  title,
  date,
  completed,
  day,
}: Task): Promise<writeTaskRespo> => {
  try {
    if (!taskRef || !userId) return { success: false, error: 'no estás conectado' }

    await set(taskRef, {
      title: title,
      date: date,
      day: day,
      completed: completed,
    })

    return { success: true }
  } catch (error) {
    console.error('Error al escribir tarea')
    console.error(error)
    return { success: true, error: 'Oops! Something went wrong. Try again. ' }
  }
}
