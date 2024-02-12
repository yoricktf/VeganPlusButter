import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import React, { useEffect } from 'react';

export default function Tiptap({ description, setRecipe }) {
  const editor = useEditor({
    // extensions: [Document, Paragraph, Text, Bold],
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],

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
      <EditorContent className='descriptionInput' editor={editor} />
      <section className='descriptionControls'>
        <p>Description formatting controls</p>
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
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          type='button'
        >
          paragraph
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
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          type='button'
        >
          horizontal rule
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          type='button'
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          type='button'
        >
          blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          type='button'
        >
          left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
          type='button'
        >
          center
        </button>
      </section>
    </>
  );
}
