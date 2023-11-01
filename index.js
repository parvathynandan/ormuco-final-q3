
class LinkedListNode {
    constructor(key, value, next = null, prev = null, ) {
      this.next = next;
      this.prev = prev;
      this.key = key;
      this.value = value;
      this.creationTime = Date.now()
    }
  }
  
  class GeoDistLru {
    constructor(expiry = 10000, cacheMaxSize = 3) {
      this.head = null;
      this.tail = null;
      this.lllength = 0;
      this.cacheMaxSize = cacheMaxSize;
      this.pairsCached = {};
      this.expiry = expiry
    }
    
    // Returns the node at 'key'
    returnNodeAtKey(key) {
        return this.pairsCached[key]
    }

    addKeyValue(key, value) {
      // If the Key-Value node already exits, remove it and add it at the top
      if (this.pairsCached[key]) {
        this.removeKeyValue(this.pairsCached[key]);
        this.lllength--;
      } else if (this.lllength === this.cacheMaxSize) {
        delete this.pairsCached[this.tail.key];
        this.removeKeyValue(this.tail);
        this.lllength--;
      }
  
      // Write to head of LinkedList
      if (this.head) {
        const node = new LinkedListNode(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      } else {
        this.head = new LinkedListNode(key, value);
        this.tail = this.head
      }
      this.pairsCached[key] = this.head;
      this.lllength++;
    }

    
    // checks if node is Head
    checkIfHead(node) {
        if(node?.prev === null) {
            return true
        }
        return false
    }

    // checks if node is Tail
    checkIfTail(node) {
        if(node?.next === null) {
            return true
        }
        return false
    }
 
    removeKeyValue(node) {
    if (node) {
        if (this.checkIfTail(node)) {
            this.tail = node.prev; //If node to be deleted is Tail, make the second last node as new Tail
            } else {
            node.next.prev = node.prev;
            }
          if (this.checkIfHead(node)) {
            this.head = node.next; //If node to be deleted is Head, make the second node as new Head
          } else {
            node.prev.next = node.next;
          }
    }

    }

    readKeyValue(key) {
        if (this.pairsCached[key]) {
          const value = this.pairsCached[key].value;
          // Make this node as the new Head
          if (this.head !== this.pairsCached[key]) {
            this.addKeyValue(key, value);
          }
          return value;
        }
    }

    deleteNodesExpired() {
        const now = Date.now();
        for (const key in this.pairsCached) {
          const item = this.pairsCached[key]
          if (now - item.creationTime >= this.expiry) {
            delete this.pairsCached[key]; // Remove the expired item
            this.removeKeyValue(this.key)
          }
        }      
    }
  
}

  module.exports = {
    GeoDistLru
  }