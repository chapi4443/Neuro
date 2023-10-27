// FAQ.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqData } from "./faqData";
import { styles } from "./style";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFAQ, setFilteredFAQ] = useState([]);
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null);
  const [itemFound, setItemFound] = useState(true);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    const allFAQs = faqData.reduce((acc, category) => {
      acc.push(...category.data);
      return acc;
    }, []);
  
    const filteredItems = allFAQs.filter((item) => {
      const questionWords = item.question.toLowerCase().split(" ");
      return questionWords.some((word) => word.includes(query));
    });
  
    setSearchQuery(query);
    setFilteredFAQ(filteredItems);
  };
  
  const toggleAnswer = (index) => {
    if (expandedQuestionIndex === index) {
      setExpandedQuestionIndex(null);
    } else if (index >= 0 && index < filteredFAQ.length) {
      setExpandedQuestionIndex(index);
    } else {
      setItemFound(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Typography variant="h4" sx={styles.title}>
          Frequently Asked Questions
        </Typography>

        {/* Search input */}
        <TextField
          sx={styles.searchInput}
          placeholder="search...."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Render FAQs by category */}
        {faqData.map((category, index) => (
          <Accordion key={index} sx={styles.accordion}>
            <AccordionSummary
              sx={styles.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h5">{category.categoryName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={styles.list}>
                {filteredFAQ.length > 0 ? (
                  category.data.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={styles.listItem}>
                      <Button
                        sx={styles.button}
                        onClick={() => toggleAnswer(itemIndex)}
                      >
                        {item.question}
                      </Button>
                      {/* Use conditional rendering to display the answer */}
                      {expandedQuestionIndex === itemIndex && (
                        <Box sx={styles.answer}>{item.answer}</Box>
                      )}
                    </ListItem>
                  ))
                ) : (
                  /* Display the "Item not found" message */
                  <ListItem sx={styles.notFoundItem}>
                    <Typography variant="h5" sx={styles.notFoundText}>
                      Your search -{searchQuery} - did not match any documents.
                    </Typography>
                    <Box sx={styles.suggestionsBox}>
                      <Typography variant="h6" sx={styles.suggestionsText}>
                        Suggestions:
                      </Typography>
                      <ul sx={styles.suggestionsList}>
                        <li>Make sure that all words are spelled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                      </ul>
                    </Box>
                  </ListItem>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
