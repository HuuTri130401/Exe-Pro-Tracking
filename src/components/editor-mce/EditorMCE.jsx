import { Editor } from '@tinymce/tinymce-react';
import React, { memo, useEffect, useState } from 'react';

function EditorMCE({ description, editorRef, name }) {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (description) setContent(description)
        return () => setContent('')
    }, [description])

    return (
        <>
            <Editor
                ref={editorRef}
                apiKey='jlna2slk6iq6pwlfujwlkjkbd26st78n9exjzjvtncvuxnd6'
                name={name}
                value={content}
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
                    setContent(content);
                }}
            />
        </>
    );
}

export default memo(EditorMCE);
