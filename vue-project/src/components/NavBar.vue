<template>
        <nav ref="navbar" id="navbar" class="rounded sticky-top navbar-collapse navbar-expand-md center_horizontal">
          <a class="nav-link" href="#basic_data">Stammdaten</a>
          <a class="nav-link" href="#vitals">Vitalparameter</a>
          <a class="nav-link" href="#vision">Sehvermögen</a>
          <a class="nav-link" href="#hearing">Hörvermögen</a>
          <a class="nav-link" href="#substances">Substanzen</a>
          <a class="nav-link" href="#psych">Psyche</a>
          <a class="nav-link" href="#kognition">Kognition</a>
          <a class="nav-link" href="#neurology">Neurologie</a>
          <a class="nav-link" href="#cardio_pulmo">Herzkreislauf</a>
          <a class="nav-link" href="#metabo">Stoffwechsel</a>
          <a class="nav-link" href="#airway_intestine">Atem- und Bauchorgane</a>
          <a class="nav-link" href="#mobility">Mobilität</a>
          <a class="nav-link" href="#processing">Datenverarbeitung</a>
        </nav>
</template>

<style scoped>
#navbar {
  overflow: hidden;
  background-color: rgba(51,51,51,0.75); /* is the hexcolor #333, but rgba needed for opacity */
  transition: all 300ms ease-in-out;
  max-width: 80rem;
  margin-right: 2.5rem;
  font-size: 0.7rem;
  margin-bottom: 10px;
}
#navbar:hover, #navbar:focus {
  background-color: rgba(51,51,51,0.95);
}
/* links */
#navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 10px;
  text-decoration: none;
  transition: all 200ms ease-in-out;
  transform-origin: center center; /* Set the scaling origin */
}
#navbar a:hover,#navbar a:focus
{
  background-color: #606466;
  transform: scale(1.15); /* Scale the link on hover */
  padding-left: 10px;
}
#navbar a:active {
    background-color: #606466;
}

.center_horizontal {
   margin: auto !important;
   width: 90% !important;
   min-width: 55rem !important;
}

</style>