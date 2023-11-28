import React, { useRef, memo } from "react";
import { Editor } from '@tinymce/tinymce-react';

const TaskDescription = ({ taskDetail, setTaskDetail }) => {
    return (
        <Editor
            apiKey='ho4916u93vf2q68ipmwki5rwpus0urlp12l823orkm245sap'
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
