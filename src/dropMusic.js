function onDocumentDragOver(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    return false
}

function onDocumentDrop(evt) {
    evt.stopPropagation()
    evt.preventDefault()

    let droppedFiles = evt.dataTransfer.files

    if (droppedFiles[0].name.includes(".mp3") || droppedFiles[0].name.includes(".wav")) {
        song.stop();
        song = loadSound(droppedFiles[0])
        song.setVolume(volume);
    }
}

function init() {
    document.addEventListener('drop', onDocumentDrop, false)
    document.addEventListener('dragover', onDocumentDragOver, false)
}

init()
