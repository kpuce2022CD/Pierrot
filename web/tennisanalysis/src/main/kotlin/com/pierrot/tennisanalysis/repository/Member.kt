package com.pierrot.tennisanalysis.repository

import org.hibernate.annotations.ColumnDefault
import javax.persistence.*

@Entity
class Member(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
//
//    @Column(nullable = false)
//    @ColumnDefault(value = "false")
//    var completed: Boolean = false,
//
//    @Column(nullable = false)
//    var todoName: String
)