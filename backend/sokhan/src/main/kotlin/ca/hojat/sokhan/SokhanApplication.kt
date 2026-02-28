package ca.hojat.sokhan

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
@RestController
class SokhanApplication {

    @GetMapping
    fun hello() = listOf("hello", "world")

}

fun main(args: Array<String>) {
    runApplication<SokhanApplication>(*args)
}
