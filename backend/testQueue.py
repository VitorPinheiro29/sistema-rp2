from heapq import heappush, heappop, heapify

class Person:
    
    def __init__(self, age):
        self.age = age
    
    def __lt__(self, other):
        return self.age < other.age

    def __repr__(self) -> str:
        return str(self.age)
    

class PriorityQueue:
    def __init__(self, people: set) -> None:
        self._queue = list(people)
        heapify(self._queue)

    def push(self, person) -> None:
        heappush(self._queue, person)

    def pop(self):
        if self._queue:
            return heappop(self._queue)
        else:
            return None

    def is_empty(self) -> bool:
        return not bool(self._queue)
    
    def __repr__(self) -> str:
        return str(self._queue)

a = Person(20.6)
people = {Person(10.2), Person(9.8), a, Person(2), Person(30), Person(100), Person(96)}
queue = PriorityQueue(people)
while not queue.is_empty():
    print(queue)
    a.age = 17
    print(queue.pop())
