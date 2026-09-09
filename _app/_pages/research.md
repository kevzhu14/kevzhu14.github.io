---
layout: page
title: Research
permalink: /research/
desc: Machine learning for chemistry, materials, and drug discovery
---

My research applies machine learning to chemical and biological data: learning over protein
subpockets, predicting polymer properties from structure and process, and benchmarking forecasting
models on environmental process data. Earlier work was synthetic and analytical: photoredox
catalysis, combinatorial library synthesis, and quantitative NMR.

## Graduate Researcher

**Vector Institute**, Toronto, ON &#x30FB; 2025&ndash;present

- **LatentPockets.** Mapping and identifying structurally unique protein binding subpockets to
  expedite target selection towards structure-based drug design, using variational autoencoders.
- **Anomaly detection & turbidity forecasting.** Built a convolutional-network benchmark for an
  Ontario water treatment plant, finding that no architecture overcomes persistence (best CNN
  R<sup>2</sup> 0.70 vs. 0.80) and tracing the ceiling to a low target variance of 0.0015
  NTU<sup>2</sup> against a &plusmn;0.02 NTU instrument noise floor.
- **Deep kernel learning for polymer properties.** Benchmarked deep kernel learning regression
  (graph neural networks & Gaussian processes) for polymer property prediction, fusing molecular
  graphs with process conditions across 6 datasets and 13 targets, and attributing structure- vs.
  process contributions via integrated gradients.
- **Polymer thermal conductivity.** Built an XGBoost/KRR framework for thermal conductivity
  prediction from RDKit descriptors, achieving test R<sup>2</sup> 0.82 vs. 0.61 for a linear
  baseline on 531 polymers, with bootstrap-ensemble uncertainty quantification.

## Researcher, Medicinal Chemistry Self-Driving Lab

**Acceleration Consortium**, Toronto, ON &#x30FB; May&ndash;Aug 2025

- Evaluated the efficacy of chemical featurization techniques in the implementation of a novel
  bitBIRCH clustering algorithm for data enrichment towards generative drug molecule design.
- Employed unsupervised learning models on an Enamine chemical building-block dataset containing
  over 1.4 million chemical compounds.
- Leveraged data science and cheminformatics Python libraries (RDKit, pandas, Matplotlib) in
  troubleshooting and modifying scripts.

## Research Assistant, Taylor Group

**Prof. Mark S. Taylor, University of Toronto** &#x30FB; 2024&ndash;2025

Independently developed a photoredox catalysis-based protocol towards the synthesis of threose
nucleosides, achieving 47% yield across 5 steps &mdash; more than 20% greater yield than previously
established methods. *Research course grade: A.*

- Employed photoredox catalysis towards the dehomologation of ribonucleosides, excising the
  5&prime;-carbon to circumvent lengthy threose nucleoside triphosphate syntheses.
- Explored 5&prime;C excision strategies via photocatalytic reductive dehydroxymethylation (via the
  5&prime;-*N*-alkoxyphthalimide (NHP) ether), decarboxylation via the 5&prime;-carboxylic
  acid&ndash;NHP ester, and decarbonylation via the aldehyde.

## Research Student, Peng Group

**Prof. Hui Peng, University of Toronto** &#x30FB; 2023&ndash;2024

Synthesized and characterized combinatorial organophosphate ester libraries for high-throughput
structure&ndash;activity and toxicity screening, using quantitative <sup>31</sup>P-NMR and MS.
*Research course grade: A.*

- Conducted binding assays on L-FABP1 via fluorescence displacement spectroscopy.

## Research Assistant, Batey Group

**Prof. Robert A. Batey, University of Toronto** &#x30FB; May&ndash;Aug 2023

- Identified chemoselective acylating electrophiles for primary over secondary amines via
  competition experiments, for use in multicomponent-coupling reactions.
- Applied quantitative <sup>19</sup>F-NMR to quantify selectivity ratios via synthesis of
  *ortho*-fluorobenzoyl based electrophiles.
