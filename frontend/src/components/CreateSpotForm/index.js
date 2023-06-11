import './CreateSpotForm.css';
import SpotForm from '../SpotForm';

function CreateSpotForm() {
    const initialData = {
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
    }

    return <SpotForm initialFormData={initialData} formType={'create'} />;
}

export default CreateSpotForm;
