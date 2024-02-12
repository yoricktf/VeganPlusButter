import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';

export default function Tiptap({ description, setRecipe }) {
  const editor = useEditor({
    // extensions: [Document, Paragraph, Text, Bold],
    extensions: [StarterKit],
    content: `
       ${description}
      `,
  });

  const html = editor?.getHTML();

  useEffect(() => {
    setRecipe((currentRecipe) => ({ ...currentRecipe, description: html }));
  }, [html]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <section className='descriptionControls'>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
          type='button'
        >
          heading
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          type='button'
        >
          toggleBold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          type='button'
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          type='button'
        >
          paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          type='button'
        >
          horizontal rule
        </button>
      </section>
      <EditorContent editor={editor} />
    </>
  );
}
