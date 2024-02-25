import {User} from "../models/user.model";

export interface DoctorUiState{
  doctor: User | null,
  loading: boolean,
  error: string | null
}
