package com.allsu.todolist.service

import com.allsu.todolist.repository.Todo
import com.allsu.todolist.repository.TodoRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class TodoService(
    private val todoRepository: TodoRepository
) {
    //todolist의 목록을 전부 불러옴
    fun getTodos()= todoRepository.findAll()

    //새로운 todo를 생성
    fun insertTodo(todoName: String) = todoRepository.save(Todo(todoName=todoName))

    //업데이트
    fun updateTodo(todoId: Long): Todo{
        //DB내에 Id가 있으면 Id를 없으면 Null를 반환시켜준다.
        val todo = todoRepository.findByIdOrNull(todoId) ?: throw Exception()
        todo.completed = !todo.completed
        return todoRepository.save(todo)
    }

    //delete
    fun deleteTodo(todoId: Long) = todoRepository.deleteById(todoId)
}