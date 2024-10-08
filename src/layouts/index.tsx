
import {FC, ReactNode} from 'react';
import { AuthGuard } from 'src/guards/auth-guard';
import { VerticalLayout } from './dashboard/vertical-layout';
import { useSettings } from 'src/hooks/use-setting';
import {IssuerGuard} from 'src/guards/issuer-guard';
import {Issuer} from 'src/utils/auth';
import SocketProvider from 'src/contexts/socket/socket-connect';

interface PageProps {
    children: ReactNode;
}
export const Layout:FC<PageProps> = (props) => {
    const {children} = props;
    const settings = useSettings();
    return (
        <IssuerGuard issuer={Issuer.JWT}>
            <AuthGuard>
                <VerticalLayout 
                    navColor={settings.navColor}
                >
                    <SocketProvider>
                        {children}
                    </SocketProvider>
                </VerticalLayout>
            </AuthGuard>
        </IssuerGuard>
    )
}