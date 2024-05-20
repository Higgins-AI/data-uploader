"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const chromadb_1 = require("chromadb");
const dotenv_1 = __importDefault(require("dotenv"));
const text_splitter_1 = require("langchain/text_splitter");
const documents_1 = require("@langchain/core/documents");
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new chromadb_1.ChromaClient({
                path: process.env.CHROMADB_PRO_URL,
            });
            const openAIEmbedder = new chromadb_1.OpenAIEmbeddingFunction({
                openai_api_key: process.env.OPENAI_API_KEY,
            });
            const collection = yield client.getOrCreateCollection({
                name: 'all-industries',
                embeddingFunction: openAIEmbedder,
            });
            (0, fs_1.readFile)('./files/Higgins_Public_Business_Database_-_Coral_Gables_-_Parsed.txt', (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
                const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
                    chunkSize: 1000,
                    chunkOverlap: 200,
                });
                const docOutput = yield splitter.splitDocuments([
                    new documents_1.Document({ pageContent: data.toString() }),
                ]);
                collection
                    .add({
                    ids: docOutput.map((doc) => (0, crypto_1.randomUUID)().toString()),
                    documents: docOutput.map((doc) => doc.pageContent),
                    metadatas: docOutput.map((doc) => doc.metadata),
                })
                    .then((res) => {
                    console.log(res);
                });
                console.log(docOutput);
                // restaurantCollection
                //   .add({
                //     ids: [randomUUID()],
                //     documents: [data.toString()],
                //   })
                //   .then((res) => {
                //     console.log(res);
                //   });
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
