import { gql } from '@apollo/client';

// Consultas
export const GET_ROL_BY_ID = gql`
  query GetRolById($id: ID!) {
    getRolById(id: $id) {
      id
      name
    }
  }
`;

export const GET_ALL_ROLES = gql`
  query GetAllRoles {
    getAllRoles {
      id
      name
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      names
      lastNames
      ci
      phone
      address
      email
      roleId
      rol {
        id
        name
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      names
      lastNames
      ci
      phone
      address
      email
      roleId
      rol {
        id
        name
      }
    }
  }
`;

export const GET_PET_BY_ID = gql`
  query GetPetById($id: ID!) {
    getPetById(id: $id) {
      id
      name
      species
      breed
      age
      gender
      color
      userId
    }
  }
`;

export const GET_ALL_PETS = gql`
  query GetAllPets {
    getAllPets {
      id
      name
      species
      breed
      age
      gender
      color
      userId
    }
  }
`;

export const GET_PETS_BY_USER_ID = gql`
  query GetPetsByUserId($userId: ID!) {
    getPetsByUserId(userId: $userId) {
      id
      name
      species
      breed
      age
      gender
      color
    }
  }
`;

export const GET_ALL_VISITS = gql`
  query GetAllVisits {
    getAllVisits {
      id
      date
      reason
      idPatient
      idDoctor
      status
      reserved
    }
  }
`;

export const GET_VISITS_BY_DOCTOR = gql`
  query GetVisitsByDoctor($idDoctor: String!) {
    getVisitsByDoctor(idDoctor: $idDoctor) {
      id
      date
      reason
      idPatient
      idDoctor
      status
      reserved
    }
  }
`;

export const GET_CONSULTATIONS_BY_ID_PATIENT = gql`
  query GetConsultationsByIdPatient($id: ID!) {
    getConsultationsByIdPatient(id: $id) {
      id
      patientId
      doctorId
      date
      weight
      height
      temperature
      heartRate
      respiratoryRate
      diagnosis
      treatment
      notes
    }
  }
`;


export const GET_ALL_VACCINES = gql`
  query GetAllVaccines {
    getAllVaccines {
      id
      patientId
      vaccineName
      administeredDate
      nextAdministeredDate
      doses
    }
  }
`;

export const GET_VACCINE_BY_ID_PATIENT = gql`
  query GetVaccineByIdPatient($id: ID!) {
    getVaccineByIdPatient(id: $id) {
      id
      patientId
      vaccineName
      administeredDate
      nextAdministeredDate
      doses
    }
  }
`;

// Mutaciones
export const CREATE_ROL = gql`
  mutation CreateRol($rolRequest: RolRequest!) {
    createRol(rolRequest: $rolRequest) {
      id
      name
    }
  }
`;

export const UPDATE_ROL = gql`
  mutation UpdateRol($id: ID!, $name: String!) {
    updateRol(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_ROL = gql`
  mutation DeleteRol($id: ID!) {
    deleteRol(id: $id)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userRequest: UserRequest!) {
    createUser(userRequest: $userRequest) {
      id
      names
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $userRequest: UserRequest!) {
    updateUser(id: $id, userRequest: $userRequest) {
      id
      names
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const CREATE_PET = gql`
  mutation CreatePet($petRequest: PetRequest!) {
    createPet(petRequest: $petRequest) {
      id
      name
    }
  }
`;

export const UPDATE_PET = gql`
  mutation UpdatePet($id: ID!, $petRequest: PetRequest!) {
    updatePet(id: $id, petRequest: $petRequest) {
      id
      name
    }
  }
`;

export const DELETE_PET = gql`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id)
  }
`;

export const CREATE_VISITS = gql`
  mutation CreateVisits($visitsRequest: VisitsRequest!) {
    createVisits(visitsRequest: $visitsRequest) {
      id
      date
      reason
      idPatient
      idDoctor
      status
      reserved
    }
  }
`;

export const UPDATE_VISITS = gql`
  mutation UpdateVisits($id: ID!, $status: String) {
    updateVisits(id: $id, status: $status) {
      id
      date
      reason
      idPatient
      idDoctor
      status
      reserved
    }
  }
`;

export const DELETE_VISITS = gql`
  mutation DeleteVisits($id: ID!) {
    deleteVisits(id: $id)
  }
`;

export const CREATE_CONSULTATIONS = gql`
  mutation CreateConsultations($consultationsRequest: ConsultationsRequest!) {
    createConsultations(consultationsRequest: $consultationsRequest) {
      id
      patientId
      doctorId
      date
      weight
      height
      temperature
      heartRate
      respiratoryRate
      diagnosis
      treatment
      notes
    }
  }
`;

export const DELETE_CONSULTATIONS = gql`
  mutation DeleteConsultations($id: ID!) {
    deleteConsultations(id: $id)
  }
`;

export const CREATE_VACCINE = gql`
  mutation CreateVaccine($vaccineRequest: VaccineRequest!) {
    createVaccine(vaccineRequest: $vaccineRequest) {
      id
      patientId
      vaccineName
      administeredDate
      nextAdministeredDate
      doses
    }
  }
`;