import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/dashboard';
import SignupPage from '../features/auth/SignupPage';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import OTPPage from '../features/auth/OTPPage';
import NotFoundPage from '../components/NotFound';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/*Root Route*/}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify-otp" element={<OTPPage />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/*unmatched routes*/}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
