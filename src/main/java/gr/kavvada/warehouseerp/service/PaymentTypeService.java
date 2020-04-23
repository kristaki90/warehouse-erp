package gr.kavvada.warehouseerp.service;

import gr.kavvada.warehouseerp.domain.PaymentType;
import gr.kavvada.warehouseerp.repository.PaymentTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link PaymentType}.
 */
@Service
@Transactional
public class PaymentTypeService {

    private final Logger log = LoggerFactory.getLogger(PaymentTypeService.class);

    private final PaymentTypeRepository paymentTypeRepository;

    public PaymentTypeService(PaymentTypeRepository paymentTypeRepository) {
        this.paymentTypeRepository = paymentTypeRepository;
    }

    /**
     * Save a paymentType.
     *
     * @param paymentType the entity to save.
     * @return the persisted entity.
     */
    public PaymentType save(PaymentType paymentType) {
        log.debug("Request to save PaymentType : {}", paymentType);
        return paymentTypeRepository.save(paymentType);
    }

    /**
     * Get all the paymentTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PaymentType> findAll(Pageable pageable) {
        log.debug("Request to get all PaymentTypes");
        return paymentTypeRepository.findAll(pageable);
    }

    /**
     * Get one paymentType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PaymentType> findOne(Long id) {
        log.debug("Request to get PaymentType : {}", id);
        return paymentTypeRepository.findById(id);
    }

    /**
     * Delete the paymentType by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PaymentType : {}", id);
        paymentTypeRepository.deleteById(id);
    }
}
