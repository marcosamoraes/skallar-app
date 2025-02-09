import { ReactNode } from 'react';

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-gray-900">Skallar Digital</h1>
                        </div>
                    </div>
                </div>
            </nav>
            
            <main className="py-6">
                {children}
            </main>
        </div>
    );
};

export default DefaultLayout;