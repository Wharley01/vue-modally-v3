# vue-modally-v3
vue-modally is a component based vue modal library, in a simpler term, it lets you use any vue component as asynchronous/synchronous modal programmatically

## Installation

you can install vue-modally-v3 with npm or yarn as described below

```bash
yarn add vue-modally-v3 // or npm install vue-modally-v3
```

## Configuration with Vue3 core

import the installed vue-modally-v3 in your main.js file

```javascript
import VueModally from 'vue-modally-v3'
```

then use the .use() method to add VueModally to plugin lists

```javascript
createApp(App).use(VueModally).mount('#app')
```

then add the inbuilt modal component to the root component of your Vue app `App.vue`

```vue
  <modal-root></modal-root> // no need for importing since it is built into the plugin 
```


## Install to Nuxt3 project

create a file called vueModally in your plugins folder, then go ahead to define your plugin according to nuxt3 doc, sample code below:

```javascript
import { defineNuxtPlugin } from "#app";
import VueModally from "vue-modally-v3";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueModally, {});
});
```
then add the inbuilt modal component to the root component of your Nuxt app `Layout` or `Pages` 

```vue
  <modal-root></modal-root> // no need for importing since it is built into the plugin 
```

## Usage

Now that you are done installing VueModally, next is to launch our first modal, first step is importing your vue modal component

```html
<script setup>
import ModalComponent from './ModalComponent.vue'


</script>
```

then import the `useModal` composable from vue-modally-v3 library and call it using the imported component as the first argument

```html
<script setup>
import ModalComponent from './ModalComponent.vue'
import {useModal} from 'vue-modally-v3'


let response = await useModal(ModalComponent,{
        options:{
            width: 500,//modal width
            blur: false,//true or false
        },
        props:{//this will be passed as props to the ModalComponent compoent
            someData: 'data',
        }
    })

    console.log({response})

</script>
```
Other `options` includes:
<br>
`closable` : to disable the modal closing when user clicks outside, accepts `true` or `false` default is false 
<br>

`padding` : to add padding to the modal wrapper, accepts a `number`  default is 0
<br>

`type` : vueModally has different modal types which are `modal` - middle of the page, `panel`- from the bottom of the page, `side` - from the side of the page
<br>

`mobile`: You might want a different modal type for mobile, accepts modal type

## Closing modal within modal component

With vue-modally-v3, you can close the modal within itself by emitting the `'close'` event

```vue
  <button @click="emit('close')">I'm a close modal button inside the modal opened</button>
```

and any argument passed to the event will be returned as value to where the modal is being called,
this can be used to return decisions made within the modal component,
```vue
  <button @click="emit('close', someDataPassed)">I'm a close modal button inside the modal opened</button>
```



if user closes the modal with escape key or by clicking outside, the returned value will be null
