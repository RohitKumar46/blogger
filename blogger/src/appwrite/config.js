import conf from './conf';
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class ConfigService{
    client = new Client();
    Databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)  
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);    
        this.bucket = new Storage(this.client);    
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColloectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColloectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColloectionId,
                slug
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColloectionId,
                slug
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteColloectionId,
                queries
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async uploadFile(file){
        try {
           return  await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }
    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            throw error;
            return false;
        }
    }

    getfilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const configService = new ConfigService()
export default configService;