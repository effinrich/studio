
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Property, Tenant, Payment, Issue } from './types';

// Helper function to convert a collection snapshot to an array of a given type
async function getCollectionData<T>(collectionName: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

// Helper function to get a single document by ID
async function getDocumentById<T>(collectionName: string, id: string): Promise<T | undefined> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return undefined;
}


export const getProperties = async (): Promise<Property[]> => {
    return getCollectionData<Property>('properties');
};

export const getTenants = async (): Promise<Tenant[]> => {
    return getCollectionData<Tenant>('tenants');
};

export const getPayments = async (): Promise<Payment[]> => {
    return getCollectionData<Payment>('payments');
};

export const getIssues = async (): Promise<Issue[]> => {
    return getCollectionData<Issue>('issues');
};


export const getTenantById = async (id: string): Promise<Tenant | undefined> => {
    return getDocumentById<Tenant>('tenants', id);
}

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
    return getDocumentById<Property>('properties', id);
};
