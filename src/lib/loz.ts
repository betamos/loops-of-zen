
export const a = 33

// [true, false, true, false]  line

export enum Edge {
    On = "on",
    Off = "off",
    Unknown = "unknown",
}


export interface Tile {
    shape: Shape
    rotation: number
}

type Shape = Edge[]

function rotateShape(s: Shape, i: number): Shape {
    const n = s.length
    i = ((i % n) + n) % n
    // if (i < 0) {
    //     i = -i + s.length
    // }
    // i = i % s.length
    const first = s.slice(0, i)
    const last = s.slice(i, s.length)
    return [...last, ...first]
}

const ALL_UNKNOWN: Tile = {
    shape: new Array(4).fill(Edge.Unknown),
    rotation: 0,
}

const ALL_OFF: Tile = {
    shape: new Array(4).fill(Edge.Off),
    rotation: 0,
}

export interface Pos {
    x: number,
    y: number,
}

export class Grid {
    size: number
    tiles: Tile[][]
    success: boolean

    constructor(size: number) {
        this.size = size
        this.tiles = new Array(size).fill([]).map(() => new Array(size).fill(ALL_UNKNOWN))
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                this.generate({x, y})
            }
        }
        this.scramble()
        this.success = false
    }

    scramble() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const tile = this.get({x, y})
                tile.rotation = Math.floor(Math.random()*8)
            }
        }
    }

    get(pos: Pos): Tile {
        if (pos.x < 0 || pos.x >= this.size || pos.y < 0 || pos.y >= this.size) {
            return ALL_OFF
        }
        return this.tiles[pos.y][pos.x]
    }

    set(pos: Pos, tile: Tile) {
        this.tiles[pos.y][pos.x] = tile
    }

    // o: orientation
    neighbor(pos: Pos, o: number): Tile {
        const other: Pos = Object.create(pos)
        if (o == 0) {
            other.y--
        } else if (o==1) {
            other.x++
        } else if (o==2) {
            other.y++
        } else if (o==3) {
            other.x--
        } else {
            throw new Error("orientation out of bounds")
        }
        return this.get(other)
    }

    // o: orientation
    neighborValues(pos: Pos): Edge[] {
        const ret: Edge[] = []
        for (let o = 0; o < 4; o++) {
            const other = this.neighbor(pos, o)
            const shape = other.shape// rotateShape(other.shape, other.rotation)
            ret.push(shape[(o+2) % 4])
        }
        return ret
    }

    generate(pos: Pos) {
        const cur = new Array(4)
        //const shape = rotateShape(cur.shape, cur.rotation)
        const other = this.neighborValues(pos)

        // inputs: yes, no, unknown x 4
        let on = 0;
        const order = [0,3,2,1]
        for (const o of order) {
            if (other[o] != Edge.Unknown) {
                cur[o] = other[o]
                if (other[o] == Edge.On)
                    on++
                continue
            }
            //console.log(o)
            const threshList = [
                .6, // 0 => 1
                .9, // 1 => 2
                .3, // 2 => 3
                .5, // 3 => 4
            ]
            const threshold = on == 1 ? .9 : .7;
            if (Math.random() < threshList[on]) {
                on += 1
                cur[o] = Edge.On
            } else {
                cur[o] = Edge.Off
            }
        }
        this.set(pos, {shape:cur, rotation:0})
    }

    rotateTile = (pos: Pos, delta: number) => {
        const cur = this.get(pos)
        cur.rotation += delta
        this.success = this.check()
    }

    check = (): boolean => {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const tile = this.get({x, y})
                const mine = rotateShape(tile.shape, tile.rotation)
                const other = this.neighborValues({x, y})
                for (let o = 0; o < 4; o++) {
                    if (mine[o] != other[o])
                        return false
                }
            }
        }
        console.log("check, success!")
        return true
    }
}
