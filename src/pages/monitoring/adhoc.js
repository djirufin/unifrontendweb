/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import { makeStyles, Paper, Toolbar } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import { crlList, pcList, smList } from "../../services/monitoringService";
import Sm from "./sm";
import Crl from "./crl";
import Pc from "./pc";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "30%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
    top: 10,
  },
}));

const headerSM = [
  { key: "country", label: "Country name" },
  { key: "region", label: "Region name" },
  { key: "district", label: "District name" },
  { key: "establishment", label: "Establishment name" },
  { key: "nameColony", label: "Colony name" },
  {
    key: "householdAccording",
    label:
      "Did the mobilizer come to the household according to the deployment plan ?",
  },
  {
    key: "childrenFive",
    label:
      "How many children under the age of 5 live in the household/concession (0-59 months)?",
  },
  {
    key: "explainWhyThereIsAPolio",
    label:
      "Does the mobilizer explain to parents/guardians why there is a polio campaign in the country?",
  },
  {
    key: "explainTheDiseaseAgainst",
    label:
      "Does the mobilizer explain to the parents/guardians the disease against which the children will be vaccinated?",
  },
  {
    key: "informAgeRangeToBeVaccinated",
    label:
      "Does the mobilizer inform parents/guardians of the age range of children to be vaccinated?",
  },
  {
    key: "informDateOfTheCurrentVaccination",
    label:
      "Does the mobilizer inform parents/guardians of the dates of the current vaccination campaign?",
  },
  {
    key: "isThereAnyReluctance",
    label: "Is there any reluctance/refusal to vaccinate in the household?",
  },
  {
    key: "reasonForReluctance",
    label: "Is there any reluctance/refusal to vaccinate in the household?",
  },
  {
    key: "childrenRefusal",
    label: "How many children in the refusal household?",
  },
  {
    key: "refusalBeenResolved",
    label: "Has the housekeeping with refusal been resolved?",
  },
  { key: "whoContributed", label: "Who contributed?" },
  {
    key: "differencePolioCovid",
    label:
      "Does the mobilizer explain the difference between the polio vaccine and the Covid-19 vaccine?",
  },
  {
    key: "barrierMeasures",
    label:
      "Does the mobilizer respect the barrier measures (wearing a mask, physical distancing, hand rubbing with a hydro-alcoholic solution and hand washing) during his visit?",
  },
  {
    key: "visitVaccinationTeam",
    label:
      "Does the mobilizer tell the parents/guardian when the vaccination team is likely to visit their village/neighbourhood/block?",
  },
  {
    key: "campaignStrategies",
    label:
      "Does the mobilizer communicate campaign strategies to parents/guardians?",
  },
  {
    key: "vaccinationStatus",
    label:
      "If there are children under 23 months old, does the mobilizer ask about their routine vaccination status?",
  },
  {
    key: "memberLocalCommunity",
    label:
      "Do the parents/guardians know the mobilizer as a member of the local community?",
  },
  {
    key: "encourageToImmunize",
    label:
      "Does the mobilizer encourage parents/guardians to continue to immunize their children after this campaign at the health center?",
  },
  {
    key: "dateCreation",
    label: "Date visit",
  },
  {
    key: "nameCreateBy",
    label: "Agent Name",
  },
  {
    key: "emailCreateBy",
    label: "Agent Email",
  },
  {
    key: "phoneCreateBy",
    label: "Agent Phone",
  },
];

const headerCRL = [
  {
    key: "isThereCurrentPlan",
    label:
      "Is there a currznt plan for implementing campaign communincations activities ?",
  },
  {
    key: "hasAMetting",
    label: "Has a meeting with leaders and partners taken place?",
  },
  {
    key: "isTheRegionCovered",
    label: "Is the Region covered by the waves of one or more radio tations?",
  },
  {
    key: "whichOnes",
    label: "Which Ones ?",
  },
  {
    key: "campaignMessages",
    label: "Were campaign messages aired on this radio station(s)?",
  },
  {
    key: "trainingForCommunity",
    label: "Has there been training for community health agents (AS)?",
  },
  {
    key: "howMuch",
    label: "How much ?",
  },
  {
    key: "doorToDoor",
    label: "Was there door-to-door sensitization by community relays?",
  },
  {
    key: "administrativeAuthorities",
    label:
      "Are the administrative authorities effectively involved in raising awareness?",
  },
  {
    key: "religiousLeaders",
    label: "Have religious leaders been involved in raising awareness?",
  },
  {
    key: "traditionalLeaders",
    label: "Have traditional leaders been involved in sensitization?",
  },
  {
    key: "involvedInRaising",
    label: "Have NGOs/Associations/Groups been involved in raising awareness?",
  },
  {
    key: "which",
    label: "Which ?",
  },
  {
    key: "groupsBeenInvolved",
    label: "Have youth and women's groups been involved in awareness raising?",
  },
  {
    key: "localResourceMobilization",
    label: "Was there local resource mobilization during advocacy meetings?",
  },
  {
    key: "listThem",
    label: "List them",
  },
  {
    key: "dateCreation",
    label: "Date visit",
  },
  {
    key: "nameCreateBy",
    label: "Agent Name",
  },
  {
    key: "emailCreateBy",
    label: "Agent Email",
  },
  {
    key: "phoneCreateBy",
    label: "Agent Phone",
  },
];

const headerPC = [
  {
    key: "informVaccinationCampaign",
    label:
      "Have you been informed about the Covid19 vaccination campaign and routine vaccination?",
  },
  {
    key: "communicationChannel",
    label: "Through which communication channel were you informed?",
  },
  { key: "quote", label: "Quote" },
  { key: "whatCovidIs", label: "Do you know what Covid19 is?" },
  { key: "manifestIt", label: "How does it manifest?" },
  {
    key: "importanceVaccination",
    label: "Do you know how important vaccination is?",
  },
  {
    key: "mobilizerWhoCame",
    label:
      "Did you recognize the social mobilizer who came to your dealership?",
  },
  {
    key: "mobilizerPerformedWell",
    label: "Do you think the Mobilizer performed well?",
  },
  {
    key: "dateCreation",
    label: "Date visit",
  },
  {
    key: "nameCreateBy",
    label: "Agent Name",
  },
  {
    key: "emailCreateBy",
    label: "Agent Email",
  },
  {
    key: "phoneCreateBy",
    label: "Agent Phone",
  },
];

const options = [
  { id: "sm", title: "Social mobilizers" },
  { id: "crl", title: "CRL & Health areas" },
  { id: "pc", title: "Proximity communication" },
];
function Adhoc(props) {
  const classes = useStyles();
  const [recordsSM, setRecordsSM] = useState([]);
  const [recordsCRL, setRecordsCRL] = useState([]);
  const [recordsPC, setRecordsPC] = useState([]);
  const [selectView, setSelectView] = useState("sm");

  const allSM = () => {
    smList().then((res) => {
      setRecordsSM(res.data);
    });
  };
  const allCRL = () => {
    crlList().then((res) => {
      setRecordsCRL(res.data);
    });
  };
  const allPC = () => {
    pcList().then((res) => {
      setRecordsPC(res.data);
    });
  };
  useEffect(() => {
    allSM();
    allCRL();
    allPC();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Select
            value={selectView}
            onChange={(e) => {
              setSelectView(e.target.value);
            }}
            options={options}
          />
          <CSVLink
            data={
              selectView === "sm"
                ? recordsSM
                : selectView === "crl"
                ? recordsCRL
                : recordsPC
            }
            headers={
              selectView === "sm"
                ? headerSM
                : selectView === "crl"
                ? headerCRL
                : headerPC
            }
            filename={"my-file.csv"}
          >
            <Controls.Button
              text="Export"
              variant="outlined"
              startIcon={<GetApp />}
              className={classes.newButton}
            />
          </CSVLink>
        </Toolbar>
        {selectView === "sm" ? <Sm /> : selectView === "crl" ? <Crl /> : <Pc />}
      </Paper>
    </div>
  );
}

export default Adhoc;
