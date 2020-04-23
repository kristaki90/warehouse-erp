package gr.kavvada.warehouseerp.web.rest;

import gr.kavvada.warehouseerp.WarehouseErpApp;
import gr.kavvada.warehouseerp.domain.PaymentType;
import gr.kavvada.warehouseerp.repository.PaymentTypeRepository;
import gr.kavvada.warehouseerp.service.PaymentTypeService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PaymentTypeResource} REST controller.
 */
@SpringBootTest(classes = WarehouseErpApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PaymentTypeResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PaymentTypeRepository paymentTypeRepository;

    @Autowired
    private PaymentTypeService paymentTypeService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaymentTypeMockMvc;

    private PaymentType paymentType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentType createEntity(EntityManager em) {
        PaymentType paymentType = new PaymentType()
            .description(DEFAULT_DESCRIPTION);
        return paymentType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentType createUpdatedEntity(EntityManager em) {
        PaymentType paymentType = new PaymentType()
            .description(UPDATED_DESCRIPTION);
        return paymentType;
    }

    @BeforeEach
    public void initTest() {
        paymentType = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaymentType() throws Exception {
        int databaseSizeBeforeCreate = paymentTypeRepository.findAll().size();

        // Create the PaymentType
        restPaymentTypeMockMvc.perform(post("/api/payment-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentType)))
            .andExpect(status().isCreated());

        // Validate the PaymentType in the database
        List<PaymentType> paymentTypeList = paymentTypeRepository.findAll();
        assertThat(paymentTypeList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentType testPaymentType = paymentTypeList.get(paymentTypeList.size() - 1);
        assertThat(testPaymentType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPaymentTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paymentTypeRepository.findAll().size();

        // Create the PaymentType with an existing ID
        paymentType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentTypeMockMvc.perform(post("/api/payment-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentType)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentType in the database
        List<PaymentType> paymentTypeList = paymentTypeRepository.findAll();
        assertThat(paymentTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentTypeRepository.findAll().size();
        // set the field null
        paymentType.setDescription(null);

        // Create the PaymentType, which fails.

        restPaymentTypeMockMvc.perform(post("/api/payment-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentType)))
            .andExpect(status().isBadRequest());

        List<PaymentType> paymentTypeList = paymentTypeRepository.findAll();
        assertThat(paymentTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPaymentTypes() throws Exception {
        // Initialize the database
        paymentTypeRepository.saveAndFlush(paymentType);

        // Get all the paymentTypeList
        restPaymentTypeMockMvc.perform(get("/api/payment-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentType.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getPaymentType() throws Exception {
        // Initialize the database
        paymentTypeRepository.saveAndFlush(paymentType);

        // Get the paymentType
        restPaymentTypeMockMvc.perform(get("/api/payment-types/{id}", paymentType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paymentType.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingPaymentType() throws Exception {
        // Get the paymentType
        restPaymentTypeMockMvc.perform(get("/api/payment-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaymentType() throws Exception {
        // Initialize the database
        paymentTypeService.save(paymentType);

        int databaseSizeBeforeUpdate = paymentTypeRepository.findAll().size();

        // Update the paymentType
        PaymentType updatedPaymentType = paymentTypeRepository.findById(paymentType.getId()).get();
        // Disconnect from session so that the updates on updatedPaymentType are not directly saved in db
        em.detach(updatedPaymentType);
        updatedPaymentType
            .description(UPDATED_DESCRIPTION);

        restPaymentTypeMockMvc.perform(put("/api/payment-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaymentType)))
            .andExpect(status().isOk());

        // Validate the PaymentType in the database
        List<PaymentType> paymentTypeList = paymentTypeRepository.findAll();
        assertThat(paymentTypeList).hasSize(databaseSizeBeforeUpdate);
        PaymentType testPaymentType = paymentTypeList.get(paymentTypeList.size() - 1);
        assertThat(testPaymentType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPaymentType() throws Exception {
        int databaseSizeBeforeUpdate = paymentTypeRepository.findAll().size();

        // Create the PaymentType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaymentTypeMockMvc.perform(put("/api/payment-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paymentType)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentType in the database
        List<PaymentType> paymentTypeList = paymentTypeRepository.findAll();
        assertThat(paymentTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaymentType() throws Exception {
        // Initialize the database
        paymentTypeService.save(paymentType);

        int databaseSizeBeforeDelete = paymentTypeRepository.findAll().size();

        // Delete the paymentType
        restPaymentTypeMockMvc.perform(delete("/api/payment-types/{id}", paymentType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PaymentType> paymentTypeList = paymentTypeRepository.findAll();
        assertThat(paymentTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
