import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <div className="d-flex align-items-center justify-content-center h-100 flex-column">
            <h1>404</h1>
            <p>{t('common.notFoundPage')}</p>

            <Link to="/">{t('common.goToBack')}</Link>
        </div>
    );
}
