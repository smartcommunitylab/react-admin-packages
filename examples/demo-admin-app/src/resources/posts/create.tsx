import { Create, SimpleForm } from 'react-admin';
import { MonacoEditorInput } from '@dslab/ra-monaco-editor';

export const PostCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <MonacoEditorInput                 
                language={"javascript"}
                fullWidth={true}
                height={'90vh'}
                source={`// take the input from the user
const number = prompt('Enter the number: ');
const result = Math.sqrt(number);
console.log(\`The square root of \${number} is \${result}\`);`}
                theme={"vs-dark"} 
                label={"Code"}
                />
        </SimpleForm>
    </Create>
);
