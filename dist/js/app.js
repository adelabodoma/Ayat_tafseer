
$(function () {
    renderPageMappingLinks()
    const displayImageHighlighters = $('.main__display__highlighter')
    displayImageHighlighters.on('mouseover', (event) => {
        highlightSoraMappingText(event.target, true)
        highlightTafseerMappingText(event.target, true)
    })

    displayImageHighlighters.on('mouseleave', (event) => {
        highlightSoraMappingText(event.target, false)
        highlightTafseerMappingText(event.target, false)
    })
});

function renderPageMappingLinks() {
    window.QuranDataPageOne.map((aya) => {
        aya.map((child, index) => {
            appendMapLink({...child, index})
        })
    })
}

function appendMapLink({top, width, left, ayaTarget}){
    $('.main__display').append(`
            <a href="" style="width: ${width}px; top: ${top}px; left: ${left}px" data-target-ref="2_${ayaTarget}_target" class="main__display__highlighter"></a>    
    `)
}

function highlightSoraMappingText(element, shouldHighlighted) {
    if (shouldHighlighted) {
        $(element).addClass('active')
    } else {
        $(element).removeClass('active')
    }
}

function highlightTafseerMappingText(element, shouldHighlighted) {
    const attrId = $(element).attr('data-target-ref')
    const targetRefElement = $(`#${attrId}`)
    scrollToElement(targetRefElement)

    if (shouldHighlighted) {
        $(element).addClass('active')
        $(targetRefElement).addClass('active')
    } else {
        $(element).removeClass('active')
        $(targetRefElement).removeClass('active')
    }
}

function scrollToElement(elementRef) {
    let element = elementRef
    let container = $('.main__tafseer');

    let containerTop = $(container).scrollTop();
    let containerBottom = containerTop + $(container).height();
    let elemTop = element.offset().top;
    let elemBottom = elemTop + element.height();

    if (elemTop < containerTop) {
        $(container).scrollTop(elemTop);
    } else if (elemBottom > containerBottom) {
        $(container).scrollTop(elemBottom - $(container).height());
    }
}
