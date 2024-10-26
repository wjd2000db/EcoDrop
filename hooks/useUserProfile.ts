import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // Firebase 인증 가져오기
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firebase Firestore 가져오기

interface UserProfile {
  imageUri: string | null;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserProfile({
            imageUri: userData.imageUrl || null,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            address: userData.address || '',
            phone: userData.phone || ''
          });
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  return { userProfile, loading };
};
