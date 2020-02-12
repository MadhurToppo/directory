package com.madhurtoppo.directory.dao;


import com.madhurtoppo.directory.model.Person;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class FakePersonDataAccessServiceTest {

  private FakePersonDataAccessService underTest;

  @Before
  public void setUp() {
    underTest = new FakePersonDataAccessService();
  }

  @Test
  public void canPerformCrud() {
    // Given person called James Bond aged 33
    UUID idOne = UUID.randomUUID();
    Person personOne = new Person(idOne, "James Bond");

    // ...And Anna Smith aged 40
    UUID idTwo = UUID.randomUUID();
    Person personTwo = new Person(idTwo, "Anna Smith");

    // When James and Anna added to db
    underTest.insertPerson(idOne, personOne);
    underTest.insertPerson(idTwo, personTwo);

    // Then can retrieve James by id
    assertThat(underTest.selectPersonById(idOne))
            .isPresent()
            .hasValueSatisfying(personFromDb -> assertThat(personFromDb).isEqualToComparingFieldByField(personOne));

    // ...And also Anna by id
    assertThat(underTest.selectPersonById(idTwo))
            .isPresent()
            .hasValueSatisfying(personFromDb -> assertThat(personFromDb).isEqualToComparingFieldByField(personTwo));

    // When get all people
    List<Person> people = underTest.selectAllPeople();

    // ...List should have size 2 and should have both James and Anna
    assertThat(people)
            .hasSize(2)
            .usingFieldByFieldElementComparator()
            .containsExactlyInAnyOrder(personOne, personTwo);

    // ... An update request (James Bond name to Jake Black)
    Person personUpdate = new Person(idOne, "Jake Black");

    // When Update
    assertThat(underTest.updatePersonById(idOne, personUpdate)).isEqualTo(1);

    // Then when get person with idOne then should have name as James Bond > Jake Black
    assertThat(underTest.selectPersonById(idOne))
            .isPresent()
            .hasValueSatisfying(personFromDb -> assertThat(personFromDb).isEqualToComparingFieldByField(personUpdate));

    // When Delete Jake Black
    assertThat(underTest.deletePersonById(idOne)).isEqualTo(1);

    // When get personOne should be empty
    assertThat(underTest.selectPersonById(idOne)).isEmpty();

    // Finally DB should only contain only Anna Smith
    assertThat(underTest.selectAllPeople())
            .hasSize(1)
            .usingFieldByFieldElementComparator()
            .containsExactlyInAnyOrder(personTwo);
  }

  @Test
  public void willReturn0IfNoPersonFoundToDelete() {
    // Given
    UUID id = UUID.randomUUID();

    // When
    int deleteResult = underTest.deletePersonById(id);

    // Then
    assertThat(deleteResult).isEqualTo(0);
  }

  @Test
  public void willReturn0IfNoPersonFoundToUpdate() {
    // Given
    UUID id = UUID.randomUUID();
    Person person = new Person(id, "James Not In Db");

    // When
    int deleteResult = underTest.updatePersonById(id, person);

    // Then
    assertThat(deleteResult).isEqualTo(0);
  }
}