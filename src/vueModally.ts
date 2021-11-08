import {ref,watch} from "vue"
import ModalRoot from "./components/ModalRoot.vue";
let modals = ref([])
let transition_delay = 300;
let default_options: Options = {
    width: 700,
    padding: 20,
    background: 'white',
    type: 'modal',
    blur: true,
    closable: true
}

interface Options{
    width?: number,
    padding?: number,
    background?: string,
    type?: 'modal' | 'panel' | 'side',
    blur?: boolean,
    closable?: boolean
}

export default  {
    install(app,options: Options){
        app.provide('$modals', modals)
        default_options = {
            ...options,
            ...default_options
        }
        app.component('ModalRoot',ModalRoot)

    }
}

export async function useModal(component, configs:{props?: any,options?: Options} = {options: {},props: {}},onClosed = null) {
    return new Promise((resolve, reject) => {
        return openModal(component,configs,(event) => {
            resolve(event)
        })
    })
}

function openModal(component, configs:{props?: any,options?: Options} = {options: {},props: {}},onClosed = null) {

    let {props, options} = configs

    options = {
        ...default_options,
        ...options
    }
    // console.log({index})
    // modals
    let index = addNewModal({
        component,
        props,
        options,
        onClosed
    })
}

function addNewModal(component, configs = {}) {
    component = {
        ...component,
        ...configs,
        closed: false
    };

    modals.value.push(component);

    return modals.value.length -1
}

function fireClosedCallback(index,$event){
    let closedFnc = modals.value[index].onClosed;
    if(typeof closedFnc == 'function'){
        closedFnc($event);
    }
}


export function closeModal(index,$event = null){
    console.log({cIndex: index})
    setModalCloseState(index);
    fireClosedCallback(index,$event);
    setTimeout(() => {
        if (index > -1) modals.value.splice(index, 1);
    }, transition_delay);
}

export function closeAllModal($event) {
    // modals.value = [];
    // return;
    let total = modals.value.length;
    if (total === 1) {
        this.closeLastModal();
        return;
    }

    for (let index = 0; index < total; index++) {
        this.setModalCloseState(index);
        this.fireClosedCallback(index,$event);
        setTimeout(() => modals.value.pop(), index * transition_delay);
    }
}

function setModalCloseState(index) {
    let modal = modals.value[index]
    modal.closed = true
    modals.value[index] = modal;
}

export function closeLastModal() {
    if (modals.value.length > 0) {
        setModalCloseState(modals.value.length - 1);
        // this.fireClosedCallback(0);
        setTimeout(() => {
            if (modals.value.length > 0) modals.value.pop();
        }, transition_delay);
    }
}