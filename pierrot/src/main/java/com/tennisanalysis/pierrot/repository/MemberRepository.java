package com.tennisanalysis.pierrot.repository;

import com.tennisanalysis.pierrot.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
}