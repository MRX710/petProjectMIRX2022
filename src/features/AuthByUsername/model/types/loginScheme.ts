export interface ILoginScheme {
   username: string | null
   password: string | null
   isLoading: boolean

   error?: string
}
