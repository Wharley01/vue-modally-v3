import {App, ref, Ref} from "vue"
//@ts-ignore
import ModalRoot from "./components/ModalRoot.vue";
interface Options {
    width?: number,
    padding?: number,
    background?: string,
    type?: 'modal' | 'panel' | 'side',
    blur?: boolean,
    closable?: boolean
}

const VueModally = {
    default_options: {
        width: 700,
        padding: 20,
        background: 'white',
        type: 'modal',
        blur: true,
        closable: true
    } as Options,
    transition_delay: 300,
    modals: ref([]) as Ref<any[]>,
    install(app: App, options: Options) {
        app.provide('$modals', this.modals)
        // $closeModal: closeModal,
        //     $closeAllModal: closeAllModal,
        app.config.globalProperties.$closeModal = (index,$event) => {
            console.log('closeModal called')
            return closeModal(index,$event)
        }
        this.default_options = {
            ...options,
            ...this.default_options
        }

        app.component('ModalRoot', ModalRoot)
    },
    openModal(component, configs: { props?: any, options?: Options } = {options: {}, props: {}}, onClosed = null) {

        let {props, options} = configs

        options = {
            ...this.default_options,
            ...options
        }
        // console.log({index})
        // modals
        let index = this.addNewModal({
            component,
            props,
            options,
            onClosed
        })
    },
    addNewModal(component, configs = {}) {
        component = {
            ...component,
            ...configs,
            closed: false
        };

        this.modals.value.push(component);
        return this.modals.value.length - 1
    },
    fireClosedCallback(index, $event) {
        let closedFnc = this.modals.value[index].onClosed;
        if (typeof closedFnc == 'function') {
            closedFnc($event);
        }
    },
    closeAllModal($event) {
        // this.modals.value = [];
        // return;
        let total = this.modals.value.length;
        if (total === 1) {
            this.closeLastModal();
            return;
        }

        for (let index = 0; index < total; index++) {
            this.setModalCloseState(index);
            this.fireClosedCallback(index, $event);
            setTimeout(() => this.modals.value.pop(), index * this.transition_delay);
        }
    },
    setModalCloseState(index) {
        this.modals.value[index].closed = true
    },
    closeLastModal() {
        if (this.modals.value.length > 0) {
            this.setModalCloseState(this.modals.value.length - 1);
            // this.fireClosedCallback(0);
            setTimeout(() => {
                if (this.modals.value.length > 0) this.modals.value.pop();
            }, this.transition_delay);
        }
    }
}

export default VueModally

export async function useModal(component, configs: { props?: any, options?: Options } = {options: {}, props: {}}, onClosed = null) {
    return new Promise((resolve, reject) => {
        return VueModally.openModal(component, configs, (event) => {
            resolve(event)
        })
    })
}

export function closeModal(index, $event = null) {
    console.log({cIndex: index})
    VueModally.setModalCloseState(index);
    VueModally.fireClosedCallback(index, $event);
    setTimeout(() => {
        if (index > -1) VueModally.modals.value.splice(index, 1);
    }, VueModally.transition_delay);
}


