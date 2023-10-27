import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";

const stroke = [
  {
    question: "What is a stroke?",
    answer:
      "A stroke is a medical condition that occurs when the blood supply to a part of the brain is interrupted or reduced, leading to damage or death of brain cells. Strokes can result in a wide range of symptoms and require immediate medical attention.",
  },
  {
    question: "What are the common risk factors for strokes?",
    answer:
      "Common risk factors for strokes include high blood pressure, smoking, diabetes, obesity, high cholesterol, and a family history of strokes.",
  },
  {
    question: "What are the two main types of strokes?",
    answer:
      "The two main types of strokes are ischemic strokes, which result from a blocked blood vessel, and hemorrhagic strokes, which occur when a blood vessel ruptures.",
  },
  {
    question: "What are the warning signs of a stroke?",
    answer:
      "The warning signs of a stroke can include sudden numbness or weakness in the face, arm, or leg, sudden confusion, trouble speaking or understanding, sudden trouble seeing, walking, or severe headache.",
  },
  {
    question: "How can strokes be prevented?",
    answer:
      "Strokes can be prevented by managing risk factors like controlling blood pressure, not smoking, maintaining a healthy diet, exercising regularly, and limiting alcohol consumption.",
  },
  {
    question: "What is the acronym FAST used for in stroke awareness?",
    answer:
      "FAST stands for Face drooping, Arm weakness, Speech difficulty, and Time to call 911. It is a tool to recognize stroke symptoms and act quickly.",
  },
  {
    question: "What is the role of rehabilitation in stroke recovery?",
    answer:
      "Rehabilitation plays a crucial role in stroke recovery, helping individuals regain lost abilities and improve their quality of life through therapy and support.",
  },
  {
    question:
      "Can strokes affect young people, or are they more common in older individuals?",
    answer:
      "Strokes can affect people of all ages, but they are more common in older individuals. However, the risk factors for stroke can affect people at any age.",
  },
  {
    question: "What are some long-term effects of a stroke?",
    answer:
      "Long-term effects of a stroke may include paralysis, speech difficulties, cognitive impairments, and emotional changes, depending on the severity and location of the stroke.",
  },
  {
    question: "How is a stroke diagnosed?",
    answer:
      "Strokes are typically diagnosed through medical imaging, such as CT scans or MRI, and clinical evaluation of the patient's symptoms and medical history.",
  },
];

const postStroke = [
  {
    question: "What is post-stroke rehabilitation?",
    answer:
      "Post-stroke rehabilitation is a specialized program aimed at helping stroke survivors regain lost abilities, improve mobility, and enhance their quality of life.",
  },
  {
    question:
      "How long does the recovery process typically take after a stroke?",
    answer:
      "The duration of stroke recovery varies from person to person. Some improvements may occur in the first few months, but recovery can continue for years.",
  },
  {
    question: "What are common physical challenges faced by stroke survivors?",
    answer:
      "Common physical challenges include muscle weakness, paralysis, balance problems, and difficulty with fine motor skills.",
  },
  {
    question:
      "Is there a role for occupational therapy in post-stroke recovery?",
    answer:
      "Yes, occupational therapy can help stroke survivors relearn daily living skills, such as dressing, cooking, and bathing, to regain independence.",
  },
  {
    question: "What is aphasia, and how does it affect stroke survivors?",
    answer:
      "Aphasia is a language disorder that can affect stroke survivors, making it difficult to speak, understand, read, or write. Speech therapy can be beneficial.",
  },
  {
    question:
      "Can post-stroke depression be a common issue, and how is it addressed?",
    answer:
      "Yes, post-stroke depression is common. It is addressed through therapy, support groups, and sometimes medication.",
  },
  {
    question: "What are some dietary considerations for stroke survivors?",
    answer:
      "Dietary considerations include managing blood pressure, cholesterol, and blood sugar levels through a balanced diet, often low in salt and saturated fats.",
  },
  {
    question:
      "Are there assistive devices that can aid stroke survivors in daily life?",
    answer:
      "Yes, various assistive devices, such as mobility aids, communication devices, and adaptive tools, can help stroke survivors maintain independence.",
  },
  {
    question: "What is spasticity, and how is it managed in post-stroke care?",
    answer:
      "Spasticity is muscle stiffness that can occur after a stroke. It is managed through physical therapy, medications, and sometimes injections.",
  },
  {
    question:
      "Can stroke survivors return to work and their previous activities?",
    answer:
      "Many stroke survivors can return to work and engage in previous activities with the right support, adjustments, and rehabilitation.",
  },
  {
    question:
      "What is the importance of social and emotional support for stroke survivors?",
    answer:
      "Social and emotional support is crucial for stroke survivors' mental and emotional well-being, helping them cope with the challenges of recovery.",
  },
  {
    question: "Is it possible for stroke survivors to drive again?",
    answer:
      "Stroke survivors may be able to drive again after evaluation by a healthcare professional. Requirements vary by location and the individual's condition.",
  },
  {
    question:
      "Can physical activity and exercise benefit post-stroke recovery?",
    answer:
      "Yes, physical activity and exercise can improve strength, mobility, and overall well-being in post-stroke recovery. Consult with a healthcare provider for guidance.",
  },
  {
    question:
      "Are there any long-term complications that stroke survivors should be aware of?",
    answer:
      "Long-term complications may include chronic health issues, such as high blood pressure, diabetes, and an increased risk of recurrent strokes.",
  },
  {
    question: "What is the role of family and caregivers in post-stroke care?",
    answer:
      "Family and caregivers play a significant role in providing support, assisting with daily tasks, and encouraging stroke survivors during their recovery journey.",
  },
  {
    question:
      "Is it possible for stroke survivors to regain speech and communication abilities?",
    answer:
      "Yes, with speech therapy and consistent effort, many stroke survivors can improve their speech and communication skills.",
  },
  {
    question:
      "What is the importance of setting achievable goals in post-stroke recovery?",
    answer:
      "Setting achievable goals can provide motivation and a sense of accomplishment during post-stroke recovery, helping individuals track progress.",
  },
  {
    question:
      "Can stroke survivors engage in recreational activities and hobbies post-stroke?",
    answer:
      "Yes, stroke survivors can often continue to enjoy recreational activities and hobbies, adapting them to their abilities and interests.",
  },
  {
    question: "Is there a risk of recurrent strokes in stroke survivors?",
    answer:
      "Yes, there is a risk of recurrent strokes. Stroke survivors are often prescribed medications and advised on lifestyle changes to reduce this risk.",
  },
];

const preStroke = [
  {
    question: "What are the warning signs of an impending stroke?",
    answer:
      "Warning signs of an impending stroke can include sudden headaches, vision problems, dizziness, and difficulty in maintaining balance.",
  },
  {
    question:
      "Are there any lifestyle changes to reduce the risk of a pre-stroke condition?",
    answer:
      "Yes, adopting a healthy lifestyle with a balanced diet, regular exercise, and managing stress can help reduce the risk of pre-stroke conditions.",
  },
  {
    question: "Is family history a significant factor in pre-stroke risk?",
    answer:
      "Family history can play a role in pre-stroke risk, but it is not the sole determinant. Other factors like lifestyle choices also influence risk.",
  },
  {
    question: "What is atrial fibrillation, and how does it relate to strokes?",
    answer:
      "Atrial fibrillation is an irregular heart rhythm that can lead to blood clots, increasing the risk of strokes. Managing atrial fibrillation is essential in stroke prevention.",
  },
  {
    question: "Can high blood pressure lead to pre-stroke conditions?",
    answer:
      "Yes, high blood pressure is a major risk factor for pre-stroke conditions. Managing blood pressure is crucial for reducing this risk.",
  },
  {
    question: "What dietary changes can help prevent pre-stroke conditions?",
    answer:
      "A diet low in salt, saturated fats, and high in fruits, vegetables, and whole grains can help reduce the risk of pre-stroke conditions.",
  },
  {
    question: "How can individuals assess their pre-stroke risk?",
    answer:
      "A healthcare provider can assess pre-stroke risk through medical history, physical exams, and by evaluating factors such as blood pressure, cholesterol, and lifestyle.",
  },
  {
    question:
      "What are the main lifestyle risk factors for pre-stroke conditions?",
    answer:
      "Main lifestyle risk factors include smoking, excessive alcohol consumption, lack of physical activity, and poor diet choices.",
  },
  {
    question: "Can diabetes increase the risk of pre-stroke conditions?",
    answer:
      "Yes, diabetes is a significant risk factor for pre-stroke conditions. Maintaining good control of blood sugar levels is essential in reducing this risk.",
  },
  {
    question:
      "How can stress management be beneficial in preventing pre-stroke conditions?",
    answer:
      "Chronic stress can contribute to pre-stroke risk. Stress management techniques, such as meditation and relaxation, can be helpful in reducing this risk.",
  },
  {
    question:
      "Are there any warning signs specifically for a transient ischemic attack (TIA)?",
    answer:
      "Warning signs of a TIA, often called a 'mini-stroke,' can include sudden weakness or numbness in the face or limbs, trouble speaking, and temporary loss of vision.",
  },
  {
    question:
      "What should I do if I suspect I'm at risk for a pre-stroke condition?",
    answer:
      "If you suspect you're at risk for a pre-stroke condition, it's important to consult a healthcare professional for a thorough assessment and guidance on risk reduction.",
  },
  {
    question:
      "Is there a role for medications in preventing pre-stroke conditions?",
    answer:
      "In some cases, medications such as blood thinners or antihypertensives may be prescribed to reduce the risk of pre-stroke conditions.",
  },
  {
    question: "Can regular exercise lower the risk of pre-stroke conditions?",
    answer:
      "Yes, regular exercise can improve cardiovascular health and reduce the risk of pre-stroke conditions. Aim for at least 150 minutes of moderate-intensity exercise per week.",
  },
  {
    question:
      "What is the connection between smoking and pre-stroke conditions?",
    answer:
      "Smoking is a major risk factor for pre-stroke conditions. Quitting smoking is one of the most effective ways to reduce this risk.",
  },
  {
    question:
      "Are there dietary supplements that can help reduce pre-stroke risk?",
    answer:
      "Some dietary supplements, like omega-3 fatty acids, may have a positive impact on heart health, but it's essential to consult a healthcare provider before taking any supplements.",
  },
  {
    question: "Can pre-stroke conditions be hereditary?",
    answer:
      "Pre-stroke conditions can have a genetic component, but lifestyle factors also play a significant role. Family history is considered when assessing risk.",
  },
  {
    question:
      "What is the relationship between cholesterol levels and pre-stroke conditions?",
    answer:
      "High levels of LDL cholesterol are associated with an increased risk of pre-stroke conditions. Lifestyle changes and medications can help manage cholesterol levels.",
  },
  {
    question:
      "What are the potential consequences of ignoring pre-stroke warning signs?",
    answer:
      "Ignoring pre-stroke warning signs can lead to a higher risk of a full-blown stroke, which may cause severe and long-lasting health issues. Prompt medical attention is crucial.",
  },
];

const heartNBrain = [
  {
    question: "What is the main function of the heart?",
    answer:
      "The main function of the heart is to pump blood throughout the body, supplying oxygen and nutrients to cells.",
  },
  {
    question: "How does the heart maintain its rhythm?",
    answer:
      "The heart's rhythm is maintained by a natural pacemaker called the sinoatrial (SA) node, which generates electrical impulses.",
  },
  {
    question: "What is the role of the brain in controlling the heart rate?",
    answer:
      "The brain, specifically the medulla oblongata, regulates heart rate by adjusting the activity of the autonomic nervous system.",
  },
  {
    question: "What are the four chambers of the heart?",
    answer:
      "The heart has four chambers: two atria (left and right) and two ventricles (left and right).",
  },
  {
    question: "How does blood flow through the heart?",
    answer:
      "Blood flows from the body into the right atrium, then into the right ventricle, and is pumped to the lungs for oxygenation. From the lungs, it returns to the left atrium and then into the left ventricle, which pumps it to the rest of the body.",
  },
  {
    question: "What is the purpose of heart valves?",
    answer:
      "Heart valves ensure one-way blood flow through the heart by preventing the backward flow of blood. The main heart valves are the mitral, tricuspid, aortic, and pulmonary valves.",
  },
  {
    question:
      "What is the function of the brain in processing sensory information?",
    answer:
      "The brain processes sensory information, integrating signals from various senses, and forming perceptions and responses to the environment.",
  },
  {
    question: "How does the brain communicate with the rest of the body?",
    answer:
      "The brain communicates with the body through the nervous system, sending signals via neurons and neurotransmitters to control various functions and coordinate movements.",
  },
  {
    question: "What are the major parts of the brain's anatomy?",
    answer:
      "The major parts of the brain include the cerebrum (responsible for thinking and voluntary actions), the cerebellum (controls balance and coordination), and the brainstem (regulates basic functions like breathing and heart rate).",
  },
  {
    question: "How are memories formed and stored in the brain?",
    answer:
      "Memories are formed and stored in the brain through complex neural connections and structures, such as the hippocampus. The exact process is still a subject of research.",
  },
  {
    question: "What is the blood-brain barrier?",
    answer:
      "The blood-brain barrier is a protective barrier that separates the bloodstream from the brain tissue, regulating the passage of substances and protecting the brain from harmful agents.",
  },
  {
    question:
      "How does the brain control involuntary functions like breathing and heart rate?",
    answer:
      "The brainstem, particularly the medulla oblongata, controls involuntary functions like breathing and heart rate by monitoring and adjusting these processes as needed.",
  },
  {
    question: "What is a stroke, and how does it relate to the brain?",
    answer:
      "A stroke is a medical condition caused by interrupted blood flow to the brain. It can result in brain damage and a range of neurological symptoms.",
  },
  {
    question: "What is the role of neurotransmitters in brain function?",
    answer:
      "Neurotransmitters are chemical messengers in the brain that transmit signals between neurons, playing a crucial role in various brain functions, including mood, memory, and cognition.",
  },
  {
    question:
      "What is the connection between the heart and the brain in terms of emotions?",
    answer:
      "The brain and the heart are interconnected in terms of emotions. The brain processes emotional responses, and these can influence heart rate and even lead to physical sensations in the heart.",
  },
  {
    question: "How does exercise affect both the heart and the brain?",
    answer:
      "Regular exercise benefits both the heart and the brain by improving cardiovascular health, increasing blood flow, and promoting the release of neurotransmitters that enhance mood and cognition.",
  },
  {
    question: "What is the impact of stress on the heart and brain?",
    answer:
      "Chronic stress can have negative effects on both the heart and the brain, leading to increased risk of heart disease and cognitive problems.",
  },
  {
    question:
      "What is the role of sleep in maintaining heart and brain health?",
    answer:
      "Adequate sleep is essential for maintaining heart and brain health, as it allows for rest, repair, and the consolidation of memories. Poor sleep can lead to various health issues.",
  },
  {
    question:
      "How do lifestyle choices, such as diet and smoking, affect the heart and brain?",
    answer:
      "Lifestyle choices, including diet and smoking, can significantly impact heart and brain health. A healthy diet and avoidance of smoking reduce the risk of heart disease and cognitive decline.",
  },
];

const healthy = [
  {
    question: "What are the key components of a healthy lifestyle?",
    answer:
      "A healthy lifestyle includes maintaining a balanced diet, regular exercise, adequate sleep, stress management, and avoiding harmful habits like smoking and excessive alcohol consumption.",
  },
  {
    question: "How does a balanced diet contribute to overall health?",
    answer:
      "A balanced diet provides essential nutrients, vitamins, and minerals, supporting overall health, energy levels, and proper functioning of the body.",
  },
  {
    question: "Why is regular physical activity important for a healthy life?",
    answer:
      "Regular physical activity helps maintain a healthy weight, reduces the risk of chronic diseases, and improves cardiovascular and mental health.",
  },
  {
    question:
      "What is the recommended amount of sleep for adults to maintain good health?",
    answer:
      "Adults should aim for 7-9 hours of quality sleep per night to support physical and mental well-being.",
  },
  {
    question:
      "How can stress impact health, and what are effective stress management techniques?",
    answer:
      "Chronic stress can negatively affect physical and mental health. Effective stress management techniques include exercise, relaxation, meditation, and seeking social support.",
  },
  {
    question:
      "What are the health risks associated with smoking and excessive alcohol consumption?",
    answer:
      "Smoking increases the risk of various diseases, including cancer and heart disease, while excessive alcohol consumption can lead to liver damage, addiction, and other health problems.",
  },
  {
    question: "What is the role of hydration in a healthy lifestyle?",
    answer:
      "Proper hydration is essential for bodily functions, including digestion, circulation, and temperature regulation. It's important to drink enough water each day.",
  },
  {
    question:
      "How does a sedentary lifestyle impact health, and what can be done to counteract it?",
    answer:
      "A sedentary lifestyle can lead to obesity and health problems. Counteract it by incorporating regular physical activity and reducing prolonged sitting time.",
  },
  {
    question: "Why is it important to maintain a healthy body weight?",
    answer:
      "A healthy body weight reduces the risk of chronic diseases such as diabetes, heart disease, and certain cancers, and supports overall well-being.",
  },
  {
    question: "What are the benefits of maintaining good mental health?",
    answer:
      "Good mental health contributes to a sense of well-being, better decision-making, healthier relationships, and improved overall quality of life.",
  },
  {
    question: "How does a positive social network affect health and longevity?",
    answer:
      "A positive social network can reduce stress, provide emotional support, and increase longevity. Maintaining strong social connections is vital for a healthy life.",
  },
  {
    question:
      "What is the role of preventive healthcare in maintaining a healthy lifestyle?",
    answer:
      "Preventive healthcare, such as regular check-ups and vaccinations, helps catch health issues early, preventing them from becoming more severe.",
  },
  {
    question: "How does nutrition impact energy levels and productivity?",
    answer:
      "Nutrition affects energy levels and productivity. A diet rich in fruits, vegetables, and whole grains provides sustained energy, enhancing productivity.",
  },
  {
    question:
      "Why is it important to limit the consumption of processed foods and added sugars?",
    answer:
      "Processed foods and added sugars can lead to weight gain and increase the risk of chronic diseases. Limiting their consumption promotes a healthier life.",
  },
  {
    question:
      "What are the effects of poor posture on health, and how can it be corrected?",
    answer:
      "Poor posture can lead to back pain and musculoskeletal problems. Correcting it involves ergonomic adjustments, exercises, and awareness of body positioning.",
  },
  {
    question:
      "What are the benefits of regular health screenings and self-examinations?",
    answer:
      "Regular health screenings and self-examinations can detect health issues early, allowing for timely treatment and improving outcomes.",
  },
  {
    question:
      "How can a healthy lifestyle positively impact mental well-being?",
    answer:
      "A healthy lifestyle, including exercise, good nutrition, and stress management, can improve mental well-being by reducing anxiety, depression, and enhancing cognitive function.",
  },
  {
    question:
      "Why is it important to balance work and personal life for a healthy lifestyle?",
    answer:
      "Balancing work and personal life is crucial for reducing stress and maintaining overall health. Overworking can lead to burnout and health problems.",
  },
  {
    question:
      "What role does regular relaxation and leisure activities play in a healthy life?",
    answer:
      "Regular relaxation and leisure activities provide a mental break, reduce stress, and contribute to emotional well-being, enhancing the overall quality of life.",
  },
];

const FAQ = () => {
  return (
    <Stack sx={{ width: "84%" }} gap={3}>
      
      <Box
        sx={{
          width: "100%",
          background: "#192655",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="#FFFFFF" variant="h4" fontWeight="bold">
          FAQ
        </Typography>
      </Box>

      <Box sx={{ width: "80%" }}>
        {stroke.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Poppins" }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

    </Stack>
  );
};

export default FAQ;
