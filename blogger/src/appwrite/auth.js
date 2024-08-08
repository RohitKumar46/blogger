import conf from './conf';
import { Client, Account, ID, Client } from "appwrite";
export class AuthService {
    client = new Client();

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account();
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email,password});
            } else{
                return userAccount;
            }
        } catch (error){
            throw error
        }
    }
    async login({email, password}){
        try {
          return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            await this.account.get();
        } catch (error){
            throw error;
        }

        return null;
    }

    async logout(){
        try {
           await thtis.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
const authService = new AuthService();

export default AuthService;

