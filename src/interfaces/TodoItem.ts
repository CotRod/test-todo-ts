import FormFields from '../enums/FormFields';

export type TodoItem = {
 [key in FormFields]: string;
}
