import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './account/AuthContext';
import { useContext } from 'react';

const Icon = () => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    const sss = {
        display: 'flex',
        paddingBottom: '5px'
    };

    const ssss = {
        paddingTop: '12px',
        paddingLeft: '12px'
    };

    const sssss = {
        paddingTop: '12px',
    };

    // 只在客戶端執行的邏輯
    if (typeof window !== 'undefined') {
        if (authContext.displayName !== "") {
            if (authContext.displayName === "普通") {
                return (
                    <div style={sss}>
                        <i className="fas fa-circle-user fa-3x" onClick={() => router.push("/account")}></i>
                        <h5 style={sssss}>使用者 {authContext.email}，您好</h5>
                    </div>
                );
            } else {
                return (
                    <div style={sss}>
                        <i className="fas fa-circle-user fa-3x" onClick={() => router.push("/account")}></i>
                        <h5 style={ssss}>商家 {authContext.displayName} , 您好</h5>
                    </div>
                );
            }
        } else {
            return (
                <div style={sss}>
                    <i className="fas fa-circle-user fa-3x" onClick={() => router.push("/account")}></i>
                    <h5 style={ssss}>登入/註冊</h5>
                </div>
            );
        }
    }

    return null; // 避免在伺服器端返回非法內容
};

export default Icon;
