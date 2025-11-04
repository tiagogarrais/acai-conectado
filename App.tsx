import React, { useState } from 'react';
import { Store, User, ComponentItem } from './types';
import { MOCK_STORES, MOCK_USERS, DEFAULT_COMPONENTS } from './constants';
import LandingPage from './components/LandingPage';
import StoreSetup from './components/StoreSetup';
import CustomerHome from './components/CustomerHome';
import AcaiBuilder from './components/AcaiBuilder';
import AuthPage from './components/AuthPage';
import RoleSelection from './components/RoleSelection';
import Header from './components/Header';
import AdminDashboard from './components/AdminDashboard';

type UserRole = 'customer' | 'store' | 'admin';
type View = 'landing' | 'store_setup' | 'customer_home' | 'acai_builder' | 'auth' | 'admin_dashboard';

const initialUsers: User[] = [
    { id: 'user1', email: 'store@owner.com', role: 'store', storeId: 'store1' },
    { id: 'user2', email: 'customer@test.com', role: 'customer' },
    { id: 'user3', email: 'admin@test.com', role: 'admin' },
];

const App: React.FC = () => {
    const [view, setView] = useState<View>('landing');
    const [stores, setStores] = useState<Store[]>(MOCK_STORES);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [showRoleSelection, setShowRoleSelection] = useState<boolean>(false);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [globalComponents, setGlobalComponents] = useState<ComponentItem[]>(DEFAULT_COMPONENTS);

    const completeLogin = (user: User) => {
        setCurrentUser(user);
        if (user.role === 'admin') {
            setView('admin_dashboard');
        } else if (user.role === 'store' && !user.storeId) {
            setView('store_setup');
        } else {
            setView('customer_home');
        }
    };

    const handleAuth = (email: string) => {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            completeLogin(existingUser);
        } else {
            const newUser: Omit<User, 'role'> & { role?: UserRole } = {
                id: `user_${Date.now()}`,
                email,
            };
            setCurrentUser(newUser as User);
            setShowRoleSelection(true);
        }
    };
    
    const handleRoleSelected = (role: UserRole) => {
        if (!currentUser) return;
        const newUser: User = { ...currentUser, role };
        setUsers(prev => [...prev, newUser]);
        setShowRoleSelection(false);
        completeLogin(newUser);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('landing');
    };

    const handleStoreCreated = (newStoreData: Omit<Store, 'id' | 'status'>) => {
        const newStore: Store = {
            ...newStoreData,
            id: `store_${Date.now()}`,
            status: 'pending',
            isPublic: false,
        };
        setStores(prevStores => [...prevStores, newStore]);
        if (currentUser && currentUser.role === 'store') {
            const updatedUser = { ...currentUser, storeId: newStore.id };
            setCurrentUser(updatedUser);
            setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
        }
        alert(`Loja "${newStore.name}" enviada para aprovação!`);
        setView('customer_home');
    };
    
    const handleStoreApproval = (storeId: string, approved: boolean) => {
        setStores(prevStores => prevStores.map(store => 
            store.id === storeId 
            ? { ...store, status: approved ? 'approved' : 'rejected', isPublic: approved }
            : store
        ));
    };

    const handleAddGlobalComponent = (newComponentData: Omit<ComponentItem, 'id'>) => {
        const newComponent: ComponentItem = {
            ...newComponentData,
            id: `comp_${Date.now()}`,
        };
        setGlobalComponents(prev => [...prev, newComponent]);
    };
    
    const handleSelectStore = (storeId: string) => {
        const store = stores.find(s => s.id === storeId);
        if (store) {
            setSelectedStore(store);
            setView('acai_builder');
        }
    };
    
    const renderView = () => {
        if (!currentUser) {
            switch(view) {
                case 'auth':
                    return <AuthPage onAuth={handleAuth} googleMockEmails={['new.user@google.com', MOCK_USERS[1].email, MOCK_USERS[2].email]} />;
                default:
                    return <LandingPage onNavigate={(v) => setView(v)} />;
            }
        }

        if (showRoleSelection) {
            return <RoleSelection onSelectRole={handleRoleSelected} />;
        }

        switch (currentUser.role) {
            case 'admin':
                return <AdminDashboard 
                    stores={stores} 
                    globalComponents={globalComponents}
                    onStoreApprove={handleStoreApproval}
                    onAddComponent={handleAddGlobalComponent}
                />;
            case 'store':
                if (!currentUser.storeId) {
                    return <StoreSetup onStoreCreated={handleStoreCreated} globalComponents={globalComponents} />;
                }
                // Fallthrough to customer view for now
            case 'customer':
                 switch (view) {
                    case 'store_setup': // Edge case if store owner navigates back
                         return <StoreSetup onStoreCreated={handleStoreCreated} globalComponents={globalComponents} />;
                    case 'acai_builder':
                        if (selectedStore) {
                            return <AcaiBuilder store={selectedStore} onBack={() => setView('customer_home')} />;
                        }
                        setView('customer_home');
                        return null;
                    default:
                        return <CustomerHome stores={stores} onSelectStore={handleSelectStore} />;
                }
            default:
                return <LandingPage onNavigate={(v) => setView(v)} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <Header 
                currentUser={currentUser} 
                onLogout={handleLogout}
                onNavigate={(v) => setView(v)}
            />
            <main>
                {renderView()}
            </main>
        </div>
    );
};

export default App;
