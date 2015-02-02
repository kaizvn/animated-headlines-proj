/**
 * Created by kaizzige on 1/31/15.
 */

App.Selectors = {

    Animation: {
        trigger: '[data-animationtag]',
        container: '.container',
        wordsPanel: '.words-panel',
        wordsLists: 'ul.word-lists-ul',
        wordWrapper: '.word-item',
        textAdded: '.text-added',
        textInput: '.input-text',
        removeBtn: '.remove-btn',
        addBtn: '.add-text-btn',
        removeSymbol: '.remove-symbol',
        inputForm: '.input-form',
        iframeWrapper: '.target-iframe',

        Target: {
            styles: {
                rotate01: '.rotate-1',
                type: '.type',
                rotate02: '.rotate-2',
                loadingBar: '.loading-bar',
                slide: '.slide',
                clip: '.clip',
                zoom: '.zoom',
                rotate03: '.rotate-3',
                scale: '.scale',
                push: '.push'
            },
            cdWordWrappers: '.cd-words-wrapper',
            intro: '.cd-intro',
            effectTemplate: '.effect-template',
            transformContainer: '.data-transform-effect',
            styleRadio: '.cd-filter input',
            selectedStyle: '[name=cd-animation-type]:checked'


        }
    }


}
