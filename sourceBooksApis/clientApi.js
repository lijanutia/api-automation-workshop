import axios from 'axios';

export async function createClient(clientName){
    const clientCreateApi = '/api/clients';

    const clientData = {
        organization: clientName,
        currency: null,
        primaryContact:
        {
            email: "soculyke@mailinator.com",
            email: "sasafdfsdf@gmail.com",
            firstName: "dfsdfsdf",
            lastName: "sdfsd",
            homePhone: null,
            mobilePhone: null
        },
        contacts: [],
        primaryCountry: null,
        primaryCity: null,
        primaryPostalCode: null,
        primaryProvince: null,
        primaryStreet1: null,
        primaryStreet2: null,
        secondaryCity: null,
        secondaryPostalCode: null,
        secondaryProvince: null,
        secondaryStreet1: null,
        secondaryStreet2: null,
        workPhone: null,
        fax: null,
        internalNotes: null
    };

    return axios.post(clientCreateApi, clientData, {validateStatus:false} );
}