export default function CollisionDetector() {
    


    function checkBoxOverlap(box1,box2) {
        if (box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.y + box1.height < box2.height) {
                console.log('box1 width',box1.x, box1.x + box1.width)
                console.log('box2 width' ,box2.x, box2.x + box2.width)
                console.log('box1 height',box1.y, box1.y + box1.height)
                console.log('box2 height' ,box2.y,box2.y + box2.height)

                return true
            } 
        return false
    }

    // need access to objects/arrays
    // need to be able to destroy objects
    // need to be able to update score
    // where should checks be run? I think on the game object. 
        //  we can pass in the objects/arrays with getter functions on the 
        //  objects/pools. callback functions on the game object will then 
        //  handle destroying enemies, triggering visual cues, and changing score


    this.checkObjToArray = function(obj,arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            if ( checkBoxOverlap(obj,arr[i]) ) {
                callback(true)
                return
            }
        }
        return false
    },

    this.checkArrayToArray = function(arr1,arr2, callback) {
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (checkBoxOverlap(arr1[i],arr2[j])) {
                    callback(true, arr1[i],arr2[j])
                    return
                }
            }
        }
    }

}