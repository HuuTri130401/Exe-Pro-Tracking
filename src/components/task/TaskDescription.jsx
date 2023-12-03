import React, { useRef, memo } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { MCE_TOKEN } from "../../utils/config";

const TaskDescription = ({ taskDetail, setTaskDetail }) => {
    return (
        <Editor
            apiKey={MCE_TOKEN}
            name={'description'}
            value={taskDetail.description}
            init={{
                menubar: false,
                height: 200,
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={(content, editor) => {
                setTaskDetail({ ...taskDetail, description: content });
            }}
        />
    );
}

export default memo(TaskDescription);
