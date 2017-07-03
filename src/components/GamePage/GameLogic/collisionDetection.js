export default function CollisionDetector() {
    
    // box - obj x (top left corner) , y, width, height
    // use imgCenterX and imCenterY props on box
    // convert to circles
    
    function checkBoxOverlap (box1, box2){
        const box1radius = ((box1.width + box1.height)/2)/2 // avg w and h then divide by 2 for r
        const box2radius = ((box2.width + box2.height)/2)/2;
        const centerpointX1 = box1.imgCenterX + box1.x;
        const centerpointY1 = box1.imgCenterY + box1.y;
        const centerpointX2 = box2.imgCenterX + box2.x;
        const centerpointY2 = box2.imgCenterY + box2.y;
        
        const minNoCollideDistance = box1radius + box2radius;
        const distance = Math.sqrt(Math.pow((centerpointX2-centerpointX1),2) + Math.pow((centerpointY2-centerpointY1),2))
        
        if (distance < minNoCollideDistance) {
            return true
        } else {
            return false
        }
    }


    this.checkObjToArray = function(obj,arr,callback) {
        for (let i = 0; i < arr.length; i++) {
            if ( checkBoxOverlap(obj,arr[i]) ) {
                callback(obj,arr[i])
                return
            }
        }
        return false
    },


    // array of "bullets" and array of "enemies" check if any one object on arr1 colides with any one object on arr2
    this.checkArrayToArray = function(arr1,arr2, callback) {
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (checkBoxOverlap(arr1[i],arr2[j])) {
                    callback(arr1[i],arr2[j])
                    return
                }
            }
        }
    }
}