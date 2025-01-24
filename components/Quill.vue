<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const option = {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", { color: [] }, 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ["clean"],
        ],
    },
};
</script>

<template>
        <QuillEditor :options="option" contentType="html" />
</template>
