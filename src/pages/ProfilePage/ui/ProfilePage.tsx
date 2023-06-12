import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";
import { EditableProfileCard, EditableProfileCardHeader } from 'features/EditableProfileCard';
import cls from './ProfilePage.module.scss';


const ProfilePage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page className={classNames(cls.ProfilePage, {}, [])}>
            {
                !!id
                && (
                    <>
                        <EditableProfileCardHeader />
                        <EditableProfileCard id={id} />
                    </>
                )
            }
        </Page>
    );
};

export default ProfilePage;

