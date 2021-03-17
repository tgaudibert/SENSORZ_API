

const date = Date.now()
console.log(date)

const date2 = Date.parse("2020-04-16T08:10:22.539Z")

const deltaDate = date - date2
console.log(deltaDate/3600000)
//console.log(Date.parse(date2))
