import { StepperForm } from '@dslab/ra-stepper';
import { Edit, ReferenceInput, TextInput } from 'react-admin';

export const PostEdit = () => (
    <Edit>
        <StepperForm>
            <StepperForm.Step label="step1">
                <ReferenceInput source="userId" reference="users" />
                <TextInput source="id" />
            </StepperForm.Step>
            <StepperForm.Step optional>
                <TextInput source="title" />
                <TextInput source="body" />
            </StepperForm.Step>
            <StepperForm.Step label="recap">
                <></>
            </StepperForm.Step>
        </StepperForm>
    </Edit>
);
