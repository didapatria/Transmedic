import { 
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where 
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    
    return data;
}

export async function retriveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();

    return data;
}

export async function register(
    userData: {
    fullname: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
    drivingLicense?: string;
    role?: string;
    }, 
) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", userData.email)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data.length > 0) {
        return { status: false, statusCode: 400, message: "Email already exists" };
    } else {
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.address = userData.address || "";
        userData.phoneNumber = userData.phoneNumber || "";
        userData.drivingLicense = userData.drivingLicense || "";
        userData.role = userData.role || "renter";
        try {
            await addDoc(collection(firestore, "users"), userData);
            return { status: true, statusCode: 200, message: "User registered successfully" };
        } catch (error) {
            return { status: false, statusCode: 400, message: "Failed to register user" };
        }
    }
}

export async function login(email: string) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", email)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data) {
        return data[0];
    } else {
       return null;
    }
}